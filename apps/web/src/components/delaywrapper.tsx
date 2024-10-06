// components/DelayedLoadingWrapper.tsx
import { useEffect, useState } from "react";
import LoadingComp from "./loadingcomp";
import Loading from "@/app/loading";

const DelayedLoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};

export default DelayedLoadingWrapper;
