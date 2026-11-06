<?php
namespace Coyote\Providers\Neon;

use Coyote\Job;
use Coyote\Models\Subscription;

readonly class JobOfferSubscription {
    private Job $job;
    private ?Subscription $subscription;

    public function __construct(private int $userId, int $jobOfferId) {
        $this->job = $this->find($jobOfferId);
        $this->subscription = $this->job->subscribers()->forUser($userId)->first();
    }

    private function find(int $jobOfferId): Job {
        return Job::query()->find($jobOfferId);
    }

    public function subscribeIfNotSubscribed(): void {
        if (!$this->subscription) {
            $this->subscribe();
        }
    }

    public function unsubscribeIfSubscribed(): void {
        if ($this->subscription) {
            $this->unsubscribe();
        }
    }

    private function subscribe(): void {
        $this->job->subscribers()->create(['user_id' => $this->userId]);
    }

    private function unsubscribe(): void {
        $this->subscription->delete();
    }
}
