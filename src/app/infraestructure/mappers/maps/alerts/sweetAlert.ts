import Swal from "sweetalert2";

export function mensajeValidacionRegistroCorrecto(response: any, mensaje: String) {
  const message = response && response.message ? response.message : `${mensaje}`;
  return Swal.fire('CONFIRMACIÓN', message, 'success');
}

export function mensajeValidacionRegistroIncorrecto(response: any, mensaje: String) {
  const message = response && response.message ? response.message : `${mensaje}`;
  return Swal.fire('ERROR', message, 'error');
}

