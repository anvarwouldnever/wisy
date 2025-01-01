import axios from "axios";
import store from "../store/store";

class Api {

    baseUrl = 'https://tapimywisy.hostweb.uz/api/v1/app';

    async signUp(email: string, password: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/register`, {
                email: email,
                password: password
            })
            if (response.data.is_success) {
                console.log(response.data)
                return true
            }
        } catch (error) {
            return error.response.data.message
        }
    }

    async signIn(email: string, password: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, {
                email: email,
                password: password
            })
            if (response.data.token) {
                const token = response.data.token
                const children = await this.getChildren()
                console.log(token) 
                return {token, children}
            }
        } catch (error) {
            console.log(error.response.data.message)
            return error.response.data.message
        }
    }

    async addChild(name: string, avatar: string, birthday: string, gender: number, engagement_time: number) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/children`,
                {
                    name: name,
                    avatar_id: avatar,
                    birthday: birthday,
                    gender: gender,
                    engagement_time: engagement_time,
                },
                {
                    headers: {
                        Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                    },
                }
            );
            if (response.status === 201) {
                const children = await this.getChildren()
                return children
            }
        } catch (error) { 
            console.log(error.response.data.message)
        }
    }

    async getChildren() {
        const response = await axios.get(`${this.baseUrl}/children`, {
            headers: {
                Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
            }
        })
        return response.data
    }

    async getCategories(data: any) {
        try {
            const response = await axios.get(`${this.baseUrl}/categories`, {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                }
            })
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    async getCollections(data: any) {
        try {
            const response = await axios.get(`${this.baseUrl}/collections`, {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                },
                params: {
                    category_id: data.id,
                    child_id: data.child_id.id
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async getSubCollections(data: any) {
        try {
            const response = await axios.get(`${this.baseUrl}/sub-collections`, {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                },
                params: {
                    collection_id: data.id,
                    child_id: data.child_id.id
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async getTasks(id: any) {
        try {
            const response = await axios.get(`${this.baseUrl}/tasks`, {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                },
                params: {
                    sub_collection_id: id.id
                }
            })
            return response.data.data
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    
    async answerTask(task_id: string, attempt: string, voice: any, child_id: string, token: string) {
        try {
            // console.log(task_id, attempt, voice, child_id)
            const formData = new FormData();
            formData.append('task_id', task_id);
            formData.append('attempt', attempt);
            formData.append('child_id', child_id);
            formData.append('voice', {
                uri: voice,
                type: 'audio/m4a',
                name: 'voice-recording.m4a',
            });

            const response = await axios.post(`${this.baseUrl}/tasks/answer`, formData, {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            if (error.response.data.message) {
                return "Lai ierakstītu atbildi, turi mikrofona pogu."
            }
        }
    }

    async sendMessage(message: any) {
        try {
            const data = new URLSearchParams();
            data.append('api_key', 'ak-XYBLLTLZwjxI7Wwui8XTnTfnzXj_8f1NCgfHn4fAfPA');
            data.append('conversation_id', 'cv-XTMVtDK2TYhRyj7R3ZTyuoJSNZd8XYPcuYqHMQAvkgw');
            data.append('language', 'ru');
            data.append('model', 'gpt-4o');
            data.append('conversational_memory_length', String(20));

            data.append('message', message.message);

            const response = await axios.post('https://aimywisy.hostweb.uz/api/v1/conversation/talk', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })

            return response.data
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async getMessages() {
        try {
            const response = await axios.get('https://aimywisy.hostweb.uz/api/v1/conversation/messages', {
                params: {
                    api_key: 'ak-XYBLLTLZwjxI7Wwui8XTnTfnzXj_8f1NCgfHn4fAfPA',
                    conversation_id: 'cv-XTMVtDK2TYhRyj7R3ZTyuoJSNZd8XYPcuYqHMQAvkgw'
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.response.data);
        }
    }

    async answerTaskSC(params: any) {
        try {
            const response = await axios.post(`${this.baseUrl}/tasks/answer`, 
            {
                task_id: params.task_id,
                attempt: params.attempt,
                child_id: params.child_id,
                answer: params.answer
            },
            {
                headers: {
                    Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                    'X-localization': 'en'
                },
            })
            return response.data
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    async answerHandWritten(answer: any) {
        try {
                console.log(answer.images)
                const formData = new FormData();
                formData.append('task_id', `${answer.task_id}`);
                formData.append('attempt', `${answer.attempt}`);
                formData.append('child_id', `${answer.child_id}`);
                formData.append('images[0]', answer.images[0]);

                // answer.images.forEach((image: any, index: number) => {
                //     formData.append(`images[${index}]`, {
                //         uri: image.uri,       // URI изображения
                //         name: `image_${index}.png`, // Имя файла
                //         type: 'image/png',    // MIME-тип файла
                //     });
                // });

                const response = await axios.post(`${this.baseUrl}/tasks/answer`, formData, {
                    headers: {
                        Authorization: `Bearer 226|COejlHeehtyv7i4F3hlhJ6QKCm1D5ddxN57VF38yd6dd67a1`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                console.log(response.data)
                return response.data
        } catch (error) {
            console.log(error.response)
        }
    }
}

module.exports = new Api();