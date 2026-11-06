<?php
namespace Coyote\Jobs;

use Coyote\Repositories\Criteria\Job\PriorDeadline;
use Coyote\Repositories\Eloquent\FirmRepository;
use Coyote\Repositories\Eloquent\JobRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateJobOffers implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, Queueable;

    /**
     * @var int
     */
    protected $firmId;

    /**
     * @param int $firmId
     */
    public function __construct($firmId)
    {
        $this->firmId = $firmId;
    }

    public function handle(JobRepository $job, FirmRepository $firm): void
    {
        $client = app('elasticsearch');
        $firm = $firm->find($this->firmId, ['name', 'logo']);
        $params = [
            'index' => config('elasticsearch.default_index'),
            'type'  => '_doc',
        ];
        $job->pushCriteria(new PriorDeadline());
        $result = $job->findWhere(['firm_id' => $this->firmId, 'is_publish' => 1], ['id']);
        if (!$result) {
            return;
        }
        foreach ($result as $row) {
            $client->update(array_merge($params, [
                'id'   => "job_$row[id]",
                'body' => [
                    'doc' => [
                        'firm' => [
                            'name' => $firm['name'],
                            'logo' => (string)$firm['logo'], // cast to string returns filename
                        ],
                    ],
                ],
            ]));
        }
        $job->resetCriteria();
    }
}
