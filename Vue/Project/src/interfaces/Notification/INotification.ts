import type { NotificationSeverity } from './NotificationSeverity'

export default interface INotification {
  id: string
  severity: NotificationSeverity
  content: string
  createdAt: Date
  holdTime: number
}
