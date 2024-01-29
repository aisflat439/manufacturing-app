import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { RouterInputs, RouterOutputs, queryClient, trpc } from "../utils/trpc";
import { useAuth } from "./useAuth";

type TCreatePart = RouterInputs["create"];
type TPart = RouterOutputs["read"];

const createPartSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum length should be 2")
    .max(20, "Maximum length should be 20"),
});

export const usePart = () => {
  const { user } = useAuth();
  const createPart = trpc.create.useMutation({
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
    onMutate: async (part) => {
      await queryClient.cancelQueries({
        queryKey: [
          ["read"],
          {
            input: user,
            type: "query",
          },
        ],
      });

      const previousParts = queryClient.getQueryData([
        ["read"],
        {
          input: user,
          type: "query",
        },
      ]);
      queryClient.setQueryData(
        [
          ["read"],
          {
            input: user,
            type: "query",
          },
        ],
        (old: TPart) => {
          return {
            ...old,
            data: [...old.data, part],
          };
        }
      );
      return { previousParts };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["read"],
          {
            input: user,
            type: "query",
          },
        ],
      });
    },
  });

  const { register, handleSubmit, reset, formState } = useForm<TCreatePart>({
    resolver: zodResolver(createPartSchema),
  });

  const hcp: SubmitHandler<Omit<TCreatePart, "teamId">> = (data) => {
    createPart.mutate({
      // teamId: user!,
      ...data,
    });
  };

  return {
    handleCreatePart: handleSubmit(hcp),
    register,
    formState,
  };
};
