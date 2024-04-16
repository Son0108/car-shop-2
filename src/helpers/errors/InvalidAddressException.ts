class InvalidAddressException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidAddressException";
  }
}

export default InvalidAddressException;
