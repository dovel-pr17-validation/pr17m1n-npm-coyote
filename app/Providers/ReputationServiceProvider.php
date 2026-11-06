<?php
namespace Coyote\Providers;

use Coyote\Repositories\Eloquent\ReputationRepository;
use Illuminate\Container\Container;
use Illuminate\Support\ServiceProvider;

class ReputationServiceProvider extends ServiceProvider
{
    protected bool $defer = true;

    public function boot(): void {}

    public function provides(): array
    {
        /*
         * UWAGA! Po dodaniu nowego elementu do tablicy trzeba wykonac php artisan clear-compiled
         */
        return [
            'reputation.post.vote',
            'reputation.post.accept',
            'reputation.microblog.create',
            'reputation.microblog.vote',
            'reputation.wiki.create',
            'reputation.wiki.update',
            'reputation.guide.create',
        ];
    }

    public function register(): void
    {
        $this->provide('reputation.post.vote', \Coyote\Services\Reputation\Post\Vote::class);
        $this->provide('reputation.post.accept', \Coyote\Services\Reputation\Post\Accept::class);
        $this->provide('reputation.microblog.create', \Coyote\Services\Reputation\Microblog\Create::class);
        $this->provide('reputation.microblog.vote', \Coyote\Services\Reputation\Microblog\Vote::class);
        $this->provide('reputation.wiki.create', \Coyote\Services\Reputation\Wiki\Create::class);
        $this->provide('reputation.wiki.update', \Coyote\Services\Reputation\Wiki\Update::class);
        $this->provide('reputation.guide.create', \Coyote\Services\Reputation\Guide\Create::class);
    }

    private function provide(string $provider, string $class): void
    {
        $this->app->bind($provider, fn(Container $app) => new $class($app[ReputationRepository::class]));
    }
}
