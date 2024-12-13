import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import api from '../api/api';

class Store {

    loading = true;
    token = null;
    children = [];
    playingChildId = null;
    musicPlaying = true;
    microOn = false;
    connectionState = false;
    game1data = null;
    categories = [];
    collections = [];
    messages = [];

    constructor() {
        makeAutoObservable(this);
        this.initializeStore();
    }

    async initializeStore() {
        await this.determineConnection()
        await this.loadData()
        await this.loadCategories()
        // await this.loadDataGame1()
        // await this.loadMessages()
    }

    async loadData() {
        try {
            await this.loadDataFromStorageChildren()
            await this.loadDataFromStorageToken()
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => {
                this.loading = false 
            });
        }
    }

    async loadDataFromStorageToken() {
        const usertoken = await this.loadDataFromStorage('token');
        runInAction(() => {
            this.token = usertoken
        });
        return this.token
    }

    async loadDataFromStorageChildren() {
        try {
            if (this.connectionState) {
                const children = await api.getChildren()
                this.setChildren(children.data)
            } else if (!this.connectionState) {
                const children = await this.loadDataFromStorage('children');
                runInAction(() => {
                    this.children = children
                });
            }
        } catch (error) {
            console.log(error);   
        }
    }

    async loadCategories() {
        if (this.connectionState) {
            try {
                const request = await api.getCategories();
    
                // Сохраняем категории в `this.categories`
                runInAction(() => {
                    this.categories = request.data.map(category => ({
                        ...category,
                        collections: [], // Добавляем пустое поле `collections` для каждой категории
                    }));
                });
    
                // Загружаем коллекции для каждой категории
                await this.loadCollections();
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    async loadCollections() {
        if (this.connectionState) {
            try {
                // Создаём массив запросов для загрузки коллекций по каждой категории
                const collectionsRequests = this.categories.map(async (category) => {
                    const collectionsResponse = await api.getCollections({ id: category.id });
    
                    // Загружаем подколлекции и задачи для каждой коллекции
                    const collectionsWithSubCollections = await Promise.allSettled(
                        collectionsResponse.data.map(async (collection) => {
                            const subCollectionsResponse = await api.getSubCollections({ id: collection.id });
    
                            const subCollectionsWithTasks = await Promise.allSettled(
                                subCollectionsResponse.data.map(async (subCollection) => {
                                    const tasksResponse = await api.getTasks({ id: subCollection.id });
                                    return {
                                        ...subCollection,
                                        tasks: tasksResponse,
                                    };
                                })
                            );
    
                            return {
                                ...collection,
                                sub_collections: subCollectionsWithTasks
                                    .filter(result => result.status === 'fulfilled')
                                    .map(result => result.value),
                            };
                        })
                    );
    
                    // Возвращаем коллекции для текущей категории
                    return collectionsWithSubCollections
                        .filter(result => result.status === 'fulfilled')
                        .map(result => result.value);
                });
    
                // Ждём завершения всех запросов
                const allCollectionsResults = await Promise.all(collectionsRequests);
    
                // Обновляем `collections` в каждой категории
                runInAction(() => {
                    this.categories = this.categories.map((category, index) => ({
                        ...category,
                        collections: allCollectionsResults[index], // Привязываем коллекции к категории
                    }));
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    
    
    

    async loadMessages() {
        if (this.connectionState) {
            try {
                const response = await api.getMessages()
                const formattedMessages = response.flatMap(item => [
                    { type: 'text', text: item.query, author: 'You' },
                    { type: 'text', text: item.response, author: 'MyWisy' }
                  ]);
                runInAction(() => {
                    this.messages = formattedMessages.reverse()
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    async setMessages(message: any) {
        runInAction(() => {
            if (message.type === 'text' && message.author === 'MyWisy') {
                this.messages = [
                    { type: message.type, text: message.text, author: message.author },
                    ...this.messages.slice(1),
                ];
            } else {
                this.messages = [{ type: message.type, text: message.text, author: message.author}, ...this.messages]
            }
        })
    }

    async loadDataFromStorage(key: any) {
        try {
            const data = await AsyncStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Ошибка загрузки данных из AsyncStorage (${key}):`, error);
            return null;
        }
    }

    async determineConnection() {
        const state = await NetInfo.fetch();
        runInAction(() => {
            this.connectionState = state.isConnected;
        });

        NetInfo.addEventListener((state) => {
            runInAction(() => {
                this.connectionState = state.isConnected;
            });
        });
    }

    async setToken(token: string) {
        runInAction(() => {
            this.token = token;
        })
        if (token !== null) {
            await AsyncStorage.setItem('token', JSON.stringify(token));
            //console.log(token)
        } else {
            await AsyncStorage.removeItem('token');
        }
    }

    async setPlayingChildId(id: any) {
        runInAction(() => {
            this.playingChildId = id;
        });
    }

    async setChildren(children: any) {
        runInAction(() => {
            this.children = children
        })
        await AsyncStorage.setItem('children', JSON.stringify(children));
    }

    async setPlayingMusic(bool: boolean) {
        runInAction(() => {
            this.musicPlaying = bool;
        });
    }

    async setMicroOn(bool: boolean) {
        runInAction(() => {
            this.microOn = bool;
        });
    }

}

export default new Store();


// async loadCollections() {
//     if (this.connectionState) {
//         try {
//             const collectionsRequests = this.categories.map(async (category) => {
//                 const collectionsResponse = await api.getCollections({ id: category.id });

//                 const collectionsWithTasks = await Promise.allSettled(
//                     collectionsResponse.data.map(async (collection) => {
//                         const tasksResponse = await api.getTasks({ id: collection.id });
//                         return {
//                             ...collection,
//                             tasks: tasksResponse
//                         };
//                     })
//                 );

//                 return collectionsWithTasks
//                     .filter(result => result.status === 'fulfilled')
//                     .map(result => result.value);
//             });

//             const allCollectionsResults = await Promise.all(collectionsRequests);
//             const flattenedResults = allCollectionsResults.flat();

//             runInAction(() => {
//                 this.collections = flattenedResults;
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }