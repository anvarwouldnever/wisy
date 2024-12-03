import React, { useState }  from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedProps, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

const Game6Screen = ({ data }) => {

    const AnimatedPath = Animated.createAnimatedComponent(Path)

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const [imagePaths, setImagesPaths] = useState(data.imagePaths);

    const [pathsData, setPathsData] = useState(data.partsPaths);
    
    const [pathLayouts, setPathLayouts] = useState([])

    const viewBoxWidth = 532.33;
    const viewBoxHeight = 250.66;

    const svgWidth = windowWidth;
    const svgHeight = windowHeight;

    const scaleX = viewBoxWidth / svgWidth;
    const scaleY = viewBoxHeight / svgHeight;

    const svgOffset = { top: windowHeight * (65 / 360), left: windowWidth * (170 / 800) };

    const handleLayout = (event, id) => {
        const { x, y, width, height } = event.nativeEvent.layout;
    
        const adjustedX = x + svgOffset.left;
        const adjustedY = y + svgOffset.top;
        const adjustedWidth = width;
        const adjustedHeight = height;
    
        if (adjustedWidth > 0 && adjustedHeight > 0) {
            setPathLayouts((prevLayouts) => [
                ...prevLayouts,
                { id, x: adjustedX, y: adjustedY, width: adjustedWidth, height: adjustedHeight },
            ]);
        }
    };

    const updateTargetFillColor = (targetIndex, newFill) => {
        setImagesPaths((prevPaths) =>
            prevPaths.map((path, index) =>
                index === targetIndex ? { ...path, fill: newFill } : path
            )
        );
    };
    
    const updateDraggedFillColor = (draggedIndex, newFill) => {
        setPathsData((prevPaths) =>
            prevPaths.map((path, index) =>
                index === draggedIndex ? { ...path, fill: newFill } : path
            )
        );
    };

    return (
                <Svg style={{top: svgOffset.top, left: svgOffset.left, position: 'absolute'}} width={532.33} height={250.66}>
                    <G id={'image'}>
                            {imagePaths && imagePaths.map((path, index) => {
                                return (
                                    <Path onLayout={(event) => {handleLayout(event, index)}} key={index} data-name={path.id} d={path.d} stroke={'#ffffff'} strokeWidth={1} fill={path.fill}/>
                                )
                            })}
                    </G> 
                    <G id={'parts'}>
                        {pathsData && pathsData.map((path, index) => {
                                const translateX = useSharedValue(0);
                                const translateY = useSharedValue(0);
                                const [dragged, setDragged] = useState(false)
                               
                                const panGesture = Gesture.Pan()
                                    .onStart((event) => {
                                        translateX.value = event.translationX;
                                        translateY.value = event.translationY;
                                    })
                                    .onUpdate((event) => {
                                        translateX.value = event.translationX;
                                        translateY.value = event.translationY;
                                        console.log(event.translationX, event.translationY)

                                        const draggingX = event.absoluteX;
                                        const draggingY = event.absoluteY;

                                        let intersectedId = null

                                        pathLayouts.forEach(layout => {
                                            const isOverlapping = 

                                                draggingX < (layout.x + layout.width) && (draggingX) > layout.x && draggingY < (layout.y + layout.height) && (draggingY) > layout.y;

                                                if (isOverlapping) {
                                                    console.log(layout.id)
                                                }
                                        });
                                    })
                                    .onEnd((event) => {
                                        const draggingX = event.absoluteX;
                                        const draggingY = event.absoluteY;

                                        let intersectedId = null

                                        pathLayouts.forEach(layout => {
                                            const isOverlapping = 

                                                draggingX < (layout.x + layout.width) && (draggingX) > layout.x && draggingY < (layout.y + layout.height) && (draggingY) > layout.y;

                                                if (isOverlapping) {
                                                    intersectedId = layout.id
                                                }
                                        });

                                        if (imagePaths[intersectedId] && imagePaths[intersectedId].id && imagePaths[intersectedId].id === path.id) {
                                            const intersectedPath = pathsData.find((p) => p.id === imagePaths[intersectedId].id);
                                            if (intersectedPath) {
                                                
                                                const currentFill = path.fill;

                                                runOnJS(updateTargetFillColor)(intersectedId, currentFill);

                                                runOnJS(updateDraggedFillColor)(index, '#dedbfb');

                                                runOnJS(setDragged)(true)
                                            }
                                        } else {
                                            console.log("Пересечения не было или ID не совпадают");
                                        }
                                        translateX.value = 0;
                                        translateY.value = 0;
                                    });

                                const animatedProps = useAnimatedProps(() => ({
                                    transform: [
                                        { translateX: translateX.value },
                                        { translateY: translateY.value },
                                    ],
                                }));

                                return (
                                    <GestureDetector key={index} gesture={panGesture}>
                                        <G>
                                            <Path
                                                d={path.d}
                                                fill={path.fill}
                                                disabled={false}
                                            />
                                            {!dragged && <AnimatedPath
                                                d={path.d}
                                                fill={path.fill}
                                                animatedProps={animatedProps}
                                                disabled={false}
                                            />}
                                        </G>
                                    </GestureDetector>
                                );
                            })}
                    </G>
                </Svg>
    );
};

export default Game6Screen;


{/* {pathLayouts.map((item, index) => {
                    return (
                        <View key={index} style={{position: 'absolute', borderWidth: 1, width: item.width, height: item.height, borderColor: 'black', top: item.y, left: item.x}} />
                    )
                })} */}
                {/* style={{position: 'absolute', top: svgOffset.top, left: svgOffset.left}} */}
                {/* viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} */}

































{/* <G id={'image'}>
                            <Path data-name="1" strokeWidth={0} stroke={'#ffffff'} d="m141.34,85.4c15.96,0,28.91-13.04,28.91-29.13s-12.94-29.13-28.91-29.13-28.91,13.04-28.91,29.13,12.94,29.13,28.91,29.13Z" fill="#dedbfb" />
                            <Path data-name="2" fill="#dedbfb" strokeWidth={0} stroke={'#ffffff'} d="m127.94,30.51c-2.09,1.13-4.05,2.5-5.78,4.1h-.15c-.17-2.77-3.21-13.56-10.86-21.05-1.14.49-2.42.69-3.76.51-3.83-.58-6.49-4.17-5.92-8.02.57-3.88,4.13-6.54,7.96-5.98,3.83.58,6.49,4.17,5.92,8.02,0,.09-.05.18-.07.29,7.41,6.98,11.26,16.42,12.67,22.14h0Z"/>
                            <Path data-name="3" d="m154.74,30.51c2.09,1.13,4.05,2.5,5.78,4.1h.15c.17-2.77,3.21-13.56,10.86-21.05,1.14.49,2.42.69,3.76.51,3.83-.58,6.49-4.17,5.92-8.02-.57-3.88-4.13-6.54-7.96-5.98-3.83.58-6.49,4.17-5.92,8.02,0,.09.04.18.07.29-7.41,6.98-11.26,16.42-12.67,22.14h.01Z" fill="#dedbfb" strokeWidth="0" class="empty"/>
                            <Path data-name="4" d="m109.95,108.42v115.7c-6.41,15.54-22.22,26.53-40.7,26.53-24.23,0-43.85-18.87-43.85-42.07,0-11.81,5.08-22.49,13.27-30.13C16.21,171.21,0,150.89,0,126.92c0-29.99,25.37-54.34,56.67-54.34,24.52,0,45.39,14.93,53.28,35.84Z" fill="#dedbfb" class="empty"/>
                            <Path data-name="4" d="m172.72,108.42v115.7c6.41,15.54,22.22,26.53,40.7,26.53,24.23,0,43.85-18.87,43.85-42.07,0-11.81-5.08-22.49-13.27-30.13,22.46-7.24,38.66-27.57,38.66-51.54,0-29.99-25.37-54.34-56.67-54.34-24.52,0-45.39,14.93-53.28,35.84h.01Z" fill="#dedbfb" class="empty" />
                            <Path data-name="6" d="m166.36,115.02c0-13.92-11.2-25.2-25.02-25.2s-25.02,11.28-25.02,25.2v110.44c0,13.92,11.2,25.2,25.02,25.2s25.02-11.28,25.02-25.2v-110.44Z" fill="#dedbfb" class="empty"/>
                            <Path data-name="7" d="m81.91,221.91c8.93-8.99,10.21-22.29,2.85-29.69-7.35-7.41-20.55-6.12-29.48,2.87-8.93,8.99-10.21,22.29-2.85,29.69,7.35,7.4,20.55,6.12,29.48-2.87Z" fill="#dedbfb" strokeWidth={1} stroke={'white'} class="empty"/>
                            <Path data-name="8" d="m230.25,224.78c7.35-7.41,6.08-20.7-2.85-29.69-8.93-8.99-22.13-10.28-29.49-2.87-7.35,7.41-6.08,20.7,2.85,29.69s22.13,10.28,29.49,2.87Z" fill="#dedbfb" strokeWidth={1} stroke={'white'} class="empty" />
                            <Path data-name="5" d="m83.04,101.37h-42.25c-2.82,0-5.11,2.3-5.11,5.14v42.07c0,2.84,2.29,5.14,5.11,5.14h42.25c2.82,0,5.11-2.3,5.11-5.14v-42.07c0-2.84-2.29-5.14-5.11-5.14Z" fill="#dedbfb" strokeWidth={1} stroke={'white'} class="empty" />
                            <Path data-name="5" d="m199.63,153.72h42.25c2.82,0,5.1-2.3,5.1-5.14v-42.07c0-2.84-2.29-5.14-5.1-5.14h-42.25c-2.82,0-5.11,2.3-5.11,5.14v42.07c0,2.84,2.29,5.14,5.11,5.14Z" fill="#dedbfb" strokeWidth={1} stroke={'white'} class="empty" />
                    </G>  */}