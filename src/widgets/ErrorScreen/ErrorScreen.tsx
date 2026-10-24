import ButtonLink from "@/shared/ui/ButtonLink/ButtonLink";
import Icon from "@/shared/ui/Icon/Icon";
import LogoMark from "@/shared/ui/LogoMark/LogoMark";

import styles from "./ErrorScreen.module.scss";

interface ErrorScreenProps {
  eyebrow: string;
  title: string;
  text: string;
  digest?: string;
  onRetry?: () => void;
}

// A missing page or a failed one, with the way home and, after a failure, a retry
const ErrorScreen = ({ eyebrow, title, text, digest, onRetry }: ErrorScreenProps) => (
  <section className={styles.screen} aria-labelledby="error-title">
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="error-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>
          {onRetry ? (
            <>
              <button type="button" className={styles.retry} onClick={onRetry}>
                <Icon name="refresh" size={18} />
                Спробувати ще раз
              </button>
              <ButtonLink href="/" variant="light">
                На головну
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/" arrow>
                На головну
              </ButtonLink>
              <ButtonLink href="/#rozdily" variant="light">
                Усі розділи
              </ButtonLink>
            </>
          )}
        </div>
        {digest ? <p className={styles.digest}>{`Код помилки: ${digest}`}</p> : null}
      </div>
      <LogoMark className={styles.mark} />
    </div>
  </section>
);

export default ErrorScreen;
