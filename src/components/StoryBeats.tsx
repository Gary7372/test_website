"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function StoryBeats({ progress }: { progress: MotionValue<number> }) {
    // Beat 1: 0-25%
    const opacity1 = useTransform(progress, [0, 0.05, 0.15, 0.2], [1, 1, 0, 0]);
    const scale1 = useTransform(progress, [0, 0.2], [1, 1.1]);

    // Beat 2: 30-60%
    const opacity2 = useTransform(progress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
    const x2 = useTransform(progress, [0.2, 0.3], [-100, 0]);

    // Beat 3: 65-90%
    const opacity3 = useTransform(progress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
    const x3 = useTransform(progress, [0.6, 0.7], [100, 0]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-8">
            {/* BEAT 1 */}
            <motion.div
                style={{ opacity: opacity1, scale: scale1 }}
                className="absolute flex flex-col items-center justify-center text-center"
            >
                <h1 className="font-syncopate text-4xl md:text-6xl text-brand-fg uppercase font-bold drop-shadow-2xl">
                    GuluGulu:
                    <br />
                    <span className="text-white/50">The Motion of Light.</span>
                </h1>
            </motion.div>

            {/* BEAT 2 */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute left-10 md:left-32 text-left"
            >
                <h2 className="font-syncopate text-3xl md:text-5xl text-brand-fg uppercase max-w-lg leading-tight font-bold drop-shadow-2xl">
                    Precision <br />
                    <span className="text-white/50">in Every Rotation.</span>
                </h2>
                <p className="font-mono mt-4 text-white/50 max-w-md text-sm md:text-base tracking-widest leading-relaxed">
                    Our lenses are ground to absolute perfection. 193 layers of glass converging to capture a singular moment.
                </p>
            </motion.div>

            {/* BEAT 3 */}
            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute right-10 md:right-32 text-right flex flex-col items-end"
            >
                <h2 className="font-syncopate text-3xl md:text-5xl text-brand-fg uppercase max-w-lg leading-tight font-bold drop-shadow-2xl">
                    Capturing <br />
                    <span className="text-white/50">the Unseen.</span>
                </h2>
                <p className="font-mono mt-4 text-white/50 max-w-md text-sm md:text-base tracking-widest leading-relaxed text-right">
                    From micro-details to vast architectures, witness the profound depth of focus that defines GuluGulu.
                </p>
            </motion.div>
        </div>
    );
}
