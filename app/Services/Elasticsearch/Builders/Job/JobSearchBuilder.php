<?php
namespace Coyote\Services\Elasticsearch\Builders\Job;

interface JobSearchBuilder extends \Coyote\Services\Elasticsearch\QueryBuilderInterface {
    public function boostTags(string $tag): void;

    public function build(): array;
}
