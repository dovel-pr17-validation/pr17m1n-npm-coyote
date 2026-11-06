<?php
namespace Coyote\Http\Controllers\Adm;

use Coyote\Repositories\Eloquent\WordRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class WordsController extends BaseController
{
    public function __construct(private WordRepository $word)
    {
        parent::__construct();
    }

    public function index(): View
    {
        $this->breadcrumb->push('Cenzura', route('adm.words'));
        return $this->view('adm.words')->with('words', array_reverse($this->word->all()->toArray()));
    }

    public function save(Request $request): RedirectResponse
    {
        $original = $this->word->pluck('replacement', 'word');
        $input = array_combine($request->input('word'), $request->input('replacement'));
        $this->transaction(function () use ($original, $input) {
            foreach (array_diff_assoc($input, $original) as $key => $value) {
                $this->word->update(['replacement' => $value], $key, 'word');
            }
            foreach (array_filter(array_diff_key($input, $original)) as $key => $value) {
                $this->word->create(['word' => $key, 'replacement' => $value]);
            }
            foreach (array_keys(array_diff_key($original, $input)) as $key) {
                $this->word->where('word', $key)->delete();
            }
        });

        return back()->with('success', 'Zmiany zostały zapisane.');
    }
}
