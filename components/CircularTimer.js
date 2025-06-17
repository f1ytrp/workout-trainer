
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { vec } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

export default function CircularTimer() {
  const strokeWidth = 4;
  const radius = 33;
  const center = vec(width / 2, height / 2);

  const [angle, setAngle] = useState(360);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const totalDuration = 30000;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(totalDuration - elapsed, 0);

      const angleProgress = (remaining / totalDuration) * 360;
      const secondsLeft = Math.ceil(remaining / 1000);

      setAngle(angleProgress);
      setTimeLeft(secondsLeft);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  const arcPath = Skia.Path.Make();
  arcPath.addArc(
    {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    },
    -90,
    angle
  );

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        <Path
          path={arcPath}
          style="stroke"
          strokeWidth={strokeWidth}
          color="blue"
        />
      </Canvas>
      <View style={styles.timerTextContainer}>
        <Text style={styles.timerText}>{timeLeft}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  timerTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});




/* import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import Animated, { 
  useSharedValue, 
  withTiming, 
  Easing,
  useAnimatedProps,
  interpolate,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function CircularTimer() {
  const size = 200;
  const strokeWidth = 4;
  const radius = 33;
  const center = { x: size / 2, y: size / 2 };

  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(0, {
      duration: 30000,
      easing: Easing.linear,
    });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const angle = interpolate(progress.value, [0, 1], [0, 360]);
    
    const path = Skia.Path.Make();
    path.addArc(
      {
        x: center.x - radius,
        y: center.y - radius,
        width: radius * 2,
        height: radius * 2,
      },
      -90,
      -angle
    );
    return { path };
  }, [center, radius]);

  return (
    <View style={styles.container}>
      <Canvas style={{ width: size, height: size }}>
        <Path
          path={Skia.Path.Make().addArc(
            {
              x: center.x - radius,
              y: center.y - radius,
              width: radius * 2,
              height: radius * 2,
            },
            -90,
            360
          )}
          style="stroke"
          strokeWidth={strokeWidth}
          color="#EEEEEE"
          strokeCap="round"
        />
        <AnimatedPath
          animatedProps={animatedProps}
          style="stroke"
          strokeWidth={strokeWidth}
          color="#3B82F6"
          strokeCap="round"
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
}); */