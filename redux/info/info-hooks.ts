import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { myIp } from "../../consts";

// const baseUrl = 'http://localhost:3003'

export const useGetIssues = () => {
  // static myIp: string = myIp;
  const fetchInfo = async () => {
    return await axios.get("http://" + myIp + ":3000/infos");
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["issues"],
    queryFn: fetchInfo,
  });
  return { isLoading, isError, data: data?.data, error };
};
