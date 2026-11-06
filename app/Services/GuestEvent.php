<?php
namespace Coyote\Services;

use Illuminate\Database\Connection;

readonly class GuestEvent {
    public function __construct(
        private Guest      $guest,
        private Connection $connection,
    ) {}

    public function event(string $eventName, array $metadata): void {
        $this->createGuestIdIfMissing();
        $this->connection->table('guest_events')->insert([
            'guest_id'   => $this->guest->guestId,
            'event_name' => $eventName,
            'metadata'   => \json_encode($metadata),
            'created_at' => now(),
        ]);
    }

    private function createGuestIdIfMissing(): void {
        $this->guest->setSetting('hasEvent', true);
    }
}
