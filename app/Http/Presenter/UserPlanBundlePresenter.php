<?php
namespace Coyote\Http\Presenter;

use Coyote\Models\UserPlanBundle;

class UserPlanBundlePresenter
{
    public function userPlanBundle(): ?array
    {
        if (!auth()->check()) {
            return null;
        }
        /** @var UserPlanBundle $bundle */
        $bundle = UserPlanBundle::query()
            ->where('user_id', '=', auth()->user()->id)
            ->where('remaining', '>', '0')
            ->first();
        if (!$bundle) {
            return null;
        }
        return [
            'remaining'  => $bundle->remaining,
            'planName'   => $bundle->plan->name,
            'useUrl'     => $this->usePlanBundleUrl($bundle->plan->id),
            'bundleSize' => $bundle->plan->bundle_size,
        ];
    }

    private function usePlanBundleUrl(int $planId): string
    {
        return route('job.submit', ['plan' => $planId]);
    }
}
