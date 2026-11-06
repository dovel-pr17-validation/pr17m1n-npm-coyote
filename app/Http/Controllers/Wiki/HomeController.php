<?php
namespace Coyote\Http\Controllers\Wiki;

use Boduch\Grid\Source\EloquentSource;
use Coyote\Http\Grids\Wiki\LogGrid;
use Coyote\Repositories\Criteria\Wiki\BelowDepth;
use Illuminate\Http\Request;

class HomeController extends BaseController
{
    /**
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $this->breadcrumb->push('Kompendium', route('wiki.home'));

        $cache = $this->getCacheFactory();

        if ($cache->has('wiki:log') === false || $request->getQueryString() !== null) {
            $grid = $this->grid();

            if (!$request->getQueryString()) {
                $cache->put('wiki:log', $grid, now()->addMinutes(30));
            }
        } else {
            $grid = $cache->get('wiki:log');
        }

        $categories = $cache->remember('wiki:categories', now()->addDay(), function () {
            $this->wiki->pushCriteria(new BelowDepth());
            return $this->wiki->children();
        });

        return $this->view('wiki.home')->with([
            'grid'       => $grid,
            'categories' => $categories,
        ]);
    }

    protected function getCacheFactory(): \Illuminate\Contracts\Cache\Repository
    {
        return app(\Illuminate\Contracts\Cache\Repository::class);
    }

    /**
     * @return string
     */
    private function grid()
    {
        return (string)$this
            ->gridBuilder()
            ->createGrid(LogGrid::class)
            ->setSource(new EloquentSource($this->wiki->getLogBuilder()))
            ->render();
    }
}
