import { toast } from "sonner";

export const firstToUpperCase = (text, allSpaces = true) => {
  if (typeof text === "string") {
    if (!allSpaces) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    text = text.split(" ");
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

export function credentialsVerify(newInfo) {
  const { email, password, name, username } = newInfo;
  if (email === "" || password === "" || name === "" || username === "") {
    toast.error("Debes rellenar todos los campos");
    return false;
  }
  if(name.length > 20) {
    toast.error("El nombre debe tener máximo 20 caracteres");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Introduzca un email válido");
    return false;
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    toast.error(
      "La contraseña debe tener una mayúcula, 6 caracteres y un número"
    );
    return false;
  }
  if (username.split(" ").length > 1) {
    toast.error(
      "El nombre de usuario no puede contener espacios"
    );
    return false;
  }
  return true;
}

export const printDateProfile = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.toLocaleDateString(undefined, { year: "numeric" });
  return `Se unió en ${month} de ${year}`;
};

export const checkAviable = async (username) => {
  getUserByUserName(username)
    .then(() => {
      return false;
    })
    .catch(() => {
      return false;
    });
};

export const formatedDate = (stringDate) => {
  const date = new Date(stringDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${formattedDate}`;
};

export const checkEditInfo = (editInfo) => {
  if (editInfo.description.length > 150) {
    toast.error(
      "La descripcion debe tener un máximo de 150 caracteres"
    );
    return false
  }
  if (editInfo.name.length > 20) {
    toast.error("El nombre debe tener un máximo de 20 caracteres");
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(editInfo.email !== "" && !emailRegex.test(editInfo.email)) {
    toast.error("El email debe ser un email válido")
    return false
  }
  if(editInfo.username.split(" ").length > 1) {
    toast.error("El nombre de usuario no debe tener espacios")
    return false
  }
  return true
}