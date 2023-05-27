import { toast } from "sonner";

export const firstToUpperCase = (text, allSpaces = true) => {
  if (typeof text === "string") {
    if(!allSpaces) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    text = text.split(" ")
  }
  const newText = text
    .map((text) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    })
    .join(" ");
  return newText;
};

export const convertToBackendFormat = (text) => {
  const finalText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return finalText;
};

export function credentialsVerify(object) {
  const { email, password, name, username } = object;
  if(email === "" || password === "" || name === "" || username === "") {
    toast.error('Debes rellenar todos los campos')
    return false; 
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error('Introduzca un email válido')
    return false; 
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    toast.error('La contraseña debe tener una mayúcula, 6 caracteres y un número')
    return false
  }
  return true; 
}