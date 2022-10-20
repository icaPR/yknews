import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { Session } from "next-auth";

interface SubscribeButtonProps {
  priceId: string;
}

interface NewSession {
  data: Session & {
    activeSubscription?: any;
  };
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session }: NewSession = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session?.activeSubscription) {
      router.push("/posts");
      return;
    }
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;
      const strip = await getStripeJs();
      await strip.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Inscreva-se
    </button>
  );
}
