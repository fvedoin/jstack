export default class APIError extends Error {
  constructor(response, body) {
    super(
      body?.error || `${response.status} - ${response.statusText}`,
    );

    this.name = 'APIError';
    this.response = response;
  }

  getContentType() {
    return this.response.headers.get('Content-Type');
  }
}
