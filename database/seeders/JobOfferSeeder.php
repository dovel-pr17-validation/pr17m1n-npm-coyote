<?php
namespace Database\Seeders;

use Coyote\Job;
use Coyote\Plan;
use Illuminate\Database\Seeder;

class JobOfferSeeder extends Seeder {
    public function run(): void {
        $free = Plan::query()->where('name', 'Free')->first();
        $premium = Plan::query()->where('name', 'Premium')->first();

        $this->createOffer('First free offer', $free);
        $this->createOffer('Second free offer', $free);

        $this->createOffer('First paid offer', $premium);
        $this->createOffer('Second paid offer', $premium);

        $this->createOffer('Third free offer', $free);
        $this->createOffer('Fourth free offer', $free);

        $this->createOffer('Old free offer', $free, true);
        $this->createOffer('Old paid offer', $premium, true);
    }

    private function createOffer(string $title, Plan $plan, bool $old = false): void {
        $createdAt = $old ? now()->subDays(14) : now();
        $premium = $plan->gross_price > 0;
        $job = factory(Job::class)->state('firm')->create([
            'title'        => $title,
            'plan_id'      => $plan->id,
            'is_publish'   => true,
            'is_on_top'    => $premium,
            'is_boost'     => $premium,
            'is_ads'       => $premium,
            'is_highlight' => $premium,
            'boost_at'     => $createdAt,
            'created_at'   => $createdAt,
            'updated_at'   => $createdAt,
        ]);
        $job->save();
    }
}
