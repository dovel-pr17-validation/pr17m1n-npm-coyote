<?php
namespace Coyote\Repositories\Criteria;

use Coyote\Repositories\Contracts\RepositoryInterface;

abstract class Criteria
{
    abstract public function apply($model, RepositoryInterface $repository);
}
