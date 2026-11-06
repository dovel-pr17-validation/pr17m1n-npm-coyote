<?php
namespace Coyote\View;

readonly class NavigationMenu {
    public function __construct(
        public int  $activeDiscussions,
        public int  $usersOnline,
        public bool $includeUserFilters,
    ) {}
}
