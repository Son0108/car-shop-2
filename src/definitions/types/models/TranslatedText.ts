/**
 * Interface used for translated dynamic values.
 */
export interface TranslatedText<T> {
  /**
   *
   */
  value: T;
  /**
   * Translated text provided by the server based on the value
   */
  text: string;
}
