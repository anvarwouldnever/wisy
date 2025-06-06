import { TouchableOpacity, View, Image, Text, useWindowDimensions } from "react-native"
import dog from '../images/Dog.png';
import narrowdown from '../images/narrowdown.png';
import store from "../store/store";
import { SvgUri } from "react-native-svg";
import { observer } from "mobx-react-lite";
import translations from "../../localization";
import Animated, { FadeInUp } from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Child = ({ setDropDown, dropDown }) => {

        const completedSubs = store?.children?.find(child => child.id === store.playingChildId?.id)?.completed_sub_collections;

        const { height: windowHeight, width: windowWidth } = useWindowDimensions();
        const calculateAge = (birthday) => {
            const today = new Date();
            const birthDate = new Date(birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
        
            if (
                today.getMonth() < birthDate.getMonth() || 
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
        
            return age;
        };

        const age = calculateAge(store.playingChildId?.birthday)

        return (
            <AnimatedTouchableOpacity entering={FadeInUp.duration(400)} activeOpacity={1} onPress={() => setDropDown(prev => !prev)} style={{height: 'auto', width: windowWidth * (312 / 360)}}>
                <View style={{width: windowWidth * (312 / 360), padding: windowWidth * (16 / 360), height: windowHeight * (80 / 800), justifyContent: 'space-between', borderRadius: 12, backgroundColor: '#F8F8F8', flexDirection: 'row', gap: windowWidth * (12 / 360), alignItems: 'center'}}>
                    {(() => {
                        const avatarObj = store.avatars.find(avatar => avatar?.id === store.playingChildId?.avatar_id);
                        const avatarUrl = avatarObj ? avatarObj?.image?.url : dog;
                        const isSvg = typeof avatarUrl === 'string' && avatarUrl.endsWith('.svg');

                        return isSvg ? (
                            <SvgUri 
                                uri={avatarUrl} 
                                width={windowHeight * (48 / 800)} 
                                height={windowWidth * (48 / 800)} 
                                style={{ aspectRatio: 1 }} 
                            />
                        ) : (
                            <Image 
                                source={{ uri: avatarUrl }} 
                                style={{
                                    width: windowHeight * (48 / 800), 
                                    height: windowWidth * (48 / 800), 
                                    aspectRatio: 1,
                                    resizeMode: 'contain'
                                }} 
                            />
                        );
                    })()}
                    <View style={{width: windowWidth * (184 / 360), height: windowHeight * (44 / 800), alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={{width: windowWidth * (184 / 360), height: windowHeight * (20 / 800), flexDirection: 'row'}}>
                            <Text style={{fontWeight: '600', color: '#000000', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800)}}>{store.playingChildId.name}</Text>
                            <Text style={{color: '#555555', fontWeight: '400', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800), marginLeft: 5}}>/ {translations?.[store.language].age} {age}</Text>
                        </View>
                        <View style={{width: windowWidth * (184 / 360), flexDirection: 'row', height: windowHeight * (20 / 800)}}>
                            <Text style={{fontWeight: '600', color: '#222222', lineHeight: windowHeight * (20 / 800), fontSize: windowHeight * (12 / 800)}}>{completedSubs}</Text>
                            <Text style={{fontWeight: '400', fontSize: windowHeight * (12 / 800), color: '#555555', lineHeight: windowHeight * (20 / 800), marginLeft: 5}}>{translations?.[store.language].completedTasks}</Text>
                        </View>
                    </View>
                    <View style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={narrowdown} style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    </View>
                </View>
            </AnimatedTouchableOpacity>
        )
    }

export default observer(Child);