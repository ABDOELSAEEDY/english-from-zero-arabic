export function passwordErrorKind(message: string, passwordLength: number): "short" | "weak" | null {
  const m = message.toLowerCase();
  if (passwordLength < 6 && /password|weak|short|length/.test(m)) return "short";
  if (/pwned|leaked|compromised|common|easy to guess|weak_password/.test(m) || (m.includes("password") && /weak|short|characters|length/.test(m))) return "weak";
  return null;
}

export function arabicAuthError(message: string, passwordLength: number): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "الإيميل أو كلمة السر غلط. اتأكد وحاول تاني.";
  if (m.includes("already registered") || m.includes("already been registered")) return "الإيميل ده مسجّل قبل كده. جرّب تسجّل دخول.";
  const kind = passwordErrorKind(message, passwordLength);
  if (kind === "short") return "كلمة السر لازم تكون ٦ حروف على الأقل.";
  if (kind === "weak") return "كلمة السر دي شائعة وسهلة التخمين. اختار كلمة سر أقوى فيها حروف وأرقام ورموز";
  if (m.includes("email") && m.includes("invalid")) return "الإيميل مكتوب غلط.";
  if (m.includes("rate") || m.includes("too many")) return "محاولات كتير. استنى شوية وحاول تاني.";
  if (m.includes("fetch") || m.includes("network")) return "في مشكلة في الاتصال بالإنترنت.";
  return "حصلت مشكلة. حاول تاني.";
}