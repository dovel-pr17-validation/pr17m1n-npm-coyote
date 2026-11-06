<?php
namespace Coyote\View;

use Coyote\Domain\Online\SessionRepository;
use Coyote\Topic;

readonly class NavigationMenuService {
    public function __construct(
        private SessionRepository $session,
    ) {}

    public function navigationMenu(): NavigationMenu {
        return new NavigationMenu(
            $this->activeDiscussions(),
            $this->session->countOnline(),
            auth()->check());
    }

    private function activeDiscussions(): int {
        return Topic::query()->where('last_post_created_at', '>', now()->subDay())->count();
    }
}
