import { useEffect, useState } from "react";
import { GetUser } from "./action";

export const useMessId = () => {
  const [messId, setMessId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const user = await GetUser();
     

      if (!user?.user?.id) return;
      const userId = user?.user?.id;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/member/messid/${userId}`
      );

      const data = await res.json();

      setMessId(data.messId);
    };

    load();
  }, []);

  return messId;
};