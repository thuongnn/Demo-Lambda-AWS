
export class HttpError extends Error {
  constructor(
    public status: number, 
    public message: string = 'Some error happenned!',
    public detail: any = null,
  ) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  toString() {
    return `[${this.status}] ${this.message} ${JSON.stringify(this.detail)}`;
  }
}
