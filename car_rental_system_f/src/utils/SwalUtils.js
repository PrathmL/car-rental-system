import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const showAlert = (title, text, icon = 'success') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#0066ff',
    borderRadius: '15px'
  });
};

export const showConfirm = (title, text, confirmButtonText = 'Yes, proceed') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0066ff',
    cancelButtonColor: '#6e6e73',
    confirmButtonText,
    borderRadius: '15px'
  });
};
