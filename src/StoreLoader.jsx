import { motion } from "framer-motion";
import { Pizza } from "lucide-react";

export function StoreLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "linear",
        }}
      >
        <Pizza className="h-14 w-14 text-primary" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-muted-foreground"
      >
        Horneando el menú…
      </motion.p>
    </div>
  );
}
