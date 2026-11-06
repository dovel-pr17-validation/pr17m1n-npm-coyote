<?php
namespace Coyote\Repositories\Criteria\Tag;

use Coyote\Repositories\Contracts\RepositoryInterface as Repository;
use Coyote\Repositories\Criteria\Criteria;

class ForCategory extends Criteria
{
    public function __construct(private int $categoryId) {}

    public function apply($model, Repository $repository)
    {
        return $model
            ->select('tags.*')
            ->where('category_id', $this->categoryId)
            ->whereNotNull('logo')
            ->orderByRaw("(resources->>'Coyote\Job')::int DESC");
    }
}
