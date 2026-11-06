<?php
namespace Coyote\Http\Controllers\Job;

use Coyote\Http\Resources\JobResource;
use Coyote\Repositories\Criteria\EagerLoading;
use Coyote\Repositories\Criteria\EagerLoadingWithCount;
use Coyote\Repositories\Criteria\Job\IncludeSubscribers;
use Coyote\Repositories\Criteria\Job\PriorDeadline;
use Coyote\Repositories\Eloquent\JobRepository;
use Illuminate\View\View;

class MineController extends \Coyote\Http\Controllers\Controller
{
    public function __construct(private JobRepository $job)
    {
        parent::__construct();
    }

    public function index(): View
    {
        $eagerCriteria = new EagerLoading(['firm', 'locations', 'tags', 'currency']);

        $this->job->pushCriteria($eagerCriteria);
        $this->job->pushCriteria(new EagerLoadingWithCount(['comments']));
        $this->job->pushCriteria(new IncludeSubscribers($this->userId));

        $paginator = $this->job->published($this->userId);

        $this->job->resetCriteria();

        $this->job->pushCriteria(new PriorDeadline());

        return $this->view('job.mine', [
            'jobs'       => JobResource::collection($paginator)->toResponse($this->request)->getData(true),
            'subscribed' => JobResource::collection($this->job->subscribes($this->userId))->toArray($this->request),
            'url'        => $this->request->url() . '?page=' . $this->request->input('page', 1),
            'input'      => [
                'page' => $this->request->input('page'),
            ],
        ]);
    }
}
