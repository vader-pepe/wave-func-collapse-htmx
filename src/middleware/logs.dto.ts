export class LogsDto {
  method: string;
  url: string;
  statusCode: number;
  contentLength?: string;
  userAgent: string;
  ip?: string;
}
