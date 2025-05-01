import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) {
          fallback();
        }
        if (error?.data?.message) {
          toast.error(error.data.message, {
            duration: 1000,
          });
        } else if (error?.message) {
          toast.error(error.message, {
            duration: 1000,
          });
        } else {
          toast.error("Something went wrong", {
            duration: 1000,
          });
        }
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [data, setData] = useState(null);

  const [mutate, { isLoading, isError, error }] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    let toastId = toast.loading(toastMessage || "Updating data...");

    try {
      const res = await mutate(...args);

      if (res.data) {
        setData(res.data);
        toast.success(res.data.message || "Updated Data Successfully", {
          duration: 1000,
          id: toastId,
        });
      } else if (res.error) {
        toast.error(res?.error?.data?.message, {
          duration: 1000,
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating data", {
        duration: 1000,
        id: toastId,
      });
    }
  };

  return [
    executeMutation,
    {
      data,
      isLoading,
      isError,
      error,
    },
  ];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event);
      });
    };
  }, [handlers]);
};

export { useAsyncMutation, useErrors, useSocketEvents };
