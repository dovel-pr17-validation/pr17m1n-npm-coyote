<?php
namespace Database\Seeders;

use Coyote\Plan;
use Illuminate\Database\Seeder;

class ModernPlansTableSeeder extends Seeder {
    public function run(): void {
        $this->createLegacyPlans();
        $this->createPlan('Free', price:0, length:14, boost:false, locations:1);
        $this->createPlan('Premium', price:159);
        $this->createPlan('Strategic', price:357, bundle:3);
        $this->createPlan('Growth', price:495, bundle:5);
        $this->createPlan('Scale', price:1580, bundle:20);
    }

    private function createPlan(
        string $planName,
        int    $price,
        ?int   $length = null,
        bool   $boost = true,
        ?int   $bundle = null,
        ?int   $locations = null,
    ): void {
        Plan::query()->forceCreate([
            'name'          => $planName,
            'price'         => $price,
            'length'        => $length ?? 30,
            'vat_rate'      => 1.23,
            'discount'      => 0,
            'boost'         => $boost ? 3 : 0,
            'benefits'      => $boost
                ? ['is_publish', 'is_boost', 'is_ads', 'is_on_top']
                : ['is_publish'],
            'is_active'     => true,
            'bundle_size'   => $bundle,
            'max_locations' => $locations ?? 10,
        ]);
    }

    private function createLegacyPlans(): void {
        \Coyote\Plan::query()->forceCreate([
            'name'      => 'Standard',
            'price'     => 0,
            'vat_rate'  => 1.23,
            'discount'  => 0,
            'length'    => 40,
            'benefits'  => ['is_publish'],
            'is_active' => false,
        ]);
        \Coyote\Plan::query()->forceCreate([
            'name'       => 'Plus',
            'price'      => 65,
            'vat_rate'   => 1.23,
            'discount'   => 0,
            'length'     => 40,
            'benefits'   => ['is_publish', 'is_social', 'is_boost', 'is_ads'],
            'is_default' => 1,
            'boost'      => 1,
            'is_active'  => false,
        ]);
        \Coyote\Plan::query()->forceCreate([
            'name'      => 'Premium',
            'price'     => 159,
            'vat_rate'  => 1.23,
            'discount'  => 0,
            'length'    => 40,
            'benefits'  => ['is_publish', 'is_social', 'is_boost', 'is_ads', 'is_highlight', 'is_on_top'],
            'boost'     => 3,
            'is_active' => false,
        ]);
    }
}
