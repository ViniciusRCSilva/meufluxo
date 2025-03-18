const clerkErrorMessages: Record<string, string> = {
    "Invalid identifier": "Email ou senha inválidos.",
    "Identifier not found": "E-mail não encontrado.",
    "Incorrect password": "Senha incorreta.",
    "Identifier is required": "O campo de e-mail é obrigatório.",
    "Password is required": "O campo de senha é obrigatório.",
    "Password must be at least 8 characters long": "A senha deve ter pelo menos 8 caracteres.",
    "A user with this identifier already exists": "Este e-mail já está cadastrado.",
    "Too many attempts. Try again later.": "Muitas tentativas. Tente novamente mais tarde.",
    "Couldn't find your account.": "E-mail não encontrado.",
    "Password has been found in an online data breach. For account safety, please use a different password.": "A senha foi encontrada em um vazamento de dados online. Por segurança, use uma senha diferente.",
    "Password is incorrect. Try again, or use another method.": "Senha incorreta. Tente novamente, ou use outro método.",
};

export const getClerkErrorMessage = (errorKey: string) => {
    return clerkErrorMessages[errorKey] || "Erro inesperado. Tente novamente.";
};
