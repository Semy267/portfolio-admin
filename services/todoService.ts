// ! EXAMPLE

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { Todo } from "@/types/todo";
// import { Apis } from "./core";
// import store from "@/store";
// import { showMsg } from "@/lib/utils";

// export const useGetTodos = (params?: any) => {
//   const { data, isLoading } = useQuery<IResponse<Todo[]>>({
//     queryKey: ["todos", params],
//     queryFn: () => Apis.todos.get(params),
//   });

//   return {
//     todos: (data?.data as Todo[]) || [],
//     isLoading,
//   };
// };

// export const useGetTodoDetail = (id: string | number) => {
//   const { data, isLoading } = useQuery<IResponse<Todo>>({
//     queryKey: ["todo", id],
//     queryFn: () => Apis.todos.getDetail(id),
//     enabled: !!id,
//   });

//   return {
//     todo: (data?.data as Todo) || null,
//     isLoading,
//   };
// };

// export const useCreateTodo = () => {
//   const { setLoading, clearLoading } = store();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (payload: any) => Apis.todos.create(payload),
//     onMutate: () => {
//       setLoading();
//     },
//     onSuccess: () => {
//       showMsg({ type: "success", title: "Todo created successfully" });
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//     onError: (error: any) => {
//       const msg = error?.response?.data?.message || "Terjadi kesalahan";
//       showMsg({ type: "error", title: msg });
//     },
//     onSettled: () => {
//       clearLoading();
//     },
//   });

//   return {
//     createTodo: mutation.mutate,
//     isLoading: mutation.status === "pending",
//     isSuccess: mutation.status === "success",
//     isError: mutation.status === "error",
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// };

// export const useUpdateTodo = () => {
//   const { setLoading, clearLoading } = store();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: ({ id, payload }: { id: string | number; payload: any }) =>
//       Apis.todos.update(id, payload),
//     onMutate: () => {
//       setLoading();
//     },
//     onSuccess: () => {
//       showMsg({ type: "success", title: "Todo updated successfully" });
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//       queryClient.invalidateQueries({ queryKey: ["todo"] });
//     },
//     onError: (error: any) => {
//       const msg = error?.response?.data?.message || "Terjadi kesalahan";
//       showMsg({ type: "error", title: msg });
//     },
//     onSettled: () => {
//       clearLoading();
//     },
//   });

//   return {
//     updateTodo: mutation.mutate,
//     isLoading: mutation.status === "pending",
//     isSuccess: mutation.status === "success",
//     isError: mutation.status === "error",
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// };

// export const useDeleteTodo = () => {
//   const { setLoading, clearLoading } = store();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (id: string | number) => Apis.todos.remove(id),
//     onMutate: () => {
//       setLoading();
//     },
//     onSuccess: () => {
//       showMsg({ type: "success", title: "Todo deleted successfully" });
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//     onError: (error: any) => {
//       const msg = error?.response?.data?.message || "Terjadi kesalahan";
//       showMsg({ type: "error", title: msg });
//     },
//     onSettled: () => {
//       clearLoading();
//     },
//   });

//   return {
//     deleteTodo: mutation.mutate,
//     isLoading: mutation.status === "pending",
//     isSuccess: mutation.status === "success",
//     isError: mutation.status === "error",
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// };
