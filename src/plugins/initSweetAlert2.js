import Swal from 'sweetalert2';

const pleaseWaitMessage = (waitTime) => {
  Swal.fire({
    title: 'Scan OK, please wait',
    type: 'info',
    footer: 'Please, enable the camera access',
    showConfirmButton: false,
    timer: waitTime,
    onClose: () => {
      successMessage();
    }
  });
};

const successMessage = () => {
  Swal.fire({
    title: 'Ready, point the QR code with your camera',
    type: 'success',
    confirmButtonText: 'OK',
    footer: 'Please, enable the camera access',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      console.log("play video 2");
      player.playVideo();
    }
  });
};

export { pleaseWaitMessage };

