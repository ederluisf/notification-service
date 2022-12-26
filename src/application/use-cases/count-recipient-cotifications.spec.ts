import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository;
    const countRecipientNotification = new CountRecipientNotification(notificationsRepository);

    await notificationsRepository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'recipient-id-1'
    }));

    await notificationsRepository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'recipient-id-1'
    }));

    await notificationsRepository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'recipient-id-2'
    }));

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-id-1'
    });

    expect(count).toEqual(2);
  });
});