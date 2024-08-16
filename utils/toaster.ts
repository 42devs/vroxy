const getToastService = () => {
  const nuxtApp = useNuxtApp();
  const getToast: typeof useToast = () => nuxtApp.vueApp.config.globalProperties.$toast;
  const toastService = getToast();
  return toastService;
};

export const showSuccessToast = (message: string) => {
  const toast = getToastService();
  toast.add({
    severity: 'info',
    summary: 'Confirmation',
    detail: message,
    life: 3000,
  });
};

export const showErrorToast = (message: string) => {
  const toast = getToastService();
  toast.add({
    severity: 'warn',
    summary: 'Error',
    detail: message,
    life: 3000,
  });
};

export const showWarningToast = (message: string) => {
  const toast = getToastService();
  toast.add({
    severity: 'warn',
    summary: 'Warning',
    detail: message,
    life: 3000,
  });
};
