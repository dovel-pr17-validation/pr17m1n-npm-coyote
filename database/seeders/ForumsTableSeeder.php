<?php
namespace Database\Seeders;

use Coyote\Events\ForumSaved;
use Coyote\Forum;
use Illuminate\Database\Seeder;

class ForumsTableSeeder extends Seeder {
    public function run(): void {
        $sectionProgramming = 'Programowanie - języki i technologie';
        $sectionOther = 'Inne';
        $sectionIt = 'IT';
        $sectionCareer = 'Rozwój zawodowy';
        
        $this->category('C/C++', 'C_i_C++', $sectionProgramming);
        $this->category('Embedded', 'Embedded', $sectionProgramming);
        $this->category('Delphi i Pascal', 'Delphi_Pascal', $sectionProgramming);
        $this->category('C# i .NET', 'C_i_.NET', $sectionProgramming);
        $this->category('Python', 'Python', $sectionProgramming);
        $this->category('Mobilne', 'Mobilne', $sectionProgramming);
        $this->category('Java', 'Java', $sectionProgramming);
        $this->category('JavaScript', 'JavaScript', $sectionProgramming);
        $this->category('Gamedev', 'Gamedev', $sectionProgramming);
        $this->category('PHP', 'PHP', $sectionProgramming);
        $this->category('Webmastering', 'Webmastering', $sectionProgramming);
        $other = $this->category('Inne języki programowania', 'Inne', $sectionProgramming);
        $this->category('VBA', 'VBA', 'Podkategorie', $other);
        $this->category('Go', 'Go', 'Podkategorie', $other);
        $this->category('Rust', 'Rust', 'Podkategorie', $other);

        $this->category('Społeczność', 'Spolecznosc', $sectionOther);
        $this->category('Off-Topic', 'Off-Topic', $sectionOther);
        $this->category('Flame', 'Flame', $sectionOther);
        $this->category('Ogłoszenia drobne', 'Ogłoszenia_drobne', $sectionOther);

        $this->category('Algorytmy i struktury danych', 'Algorytmy', $sectionIt);
        $this->category('AI', 'AI', $sectionIt);
        $this->category('Dev/ops', 'Devops', $sectionIt);
        $this->category('Inżynieria oprogramowania', 'Inzynieria_oprogramowania', $sectionIt);
        $this->category('Hardware/Software', 'Hardware_Software', $sectionIt);
        $this->category('Bazy danych', 'Bazy_danych', $sectionIt);
        $this->category('Nietuzinkowe tematy', 'Nietuzinkowe_tematy', $sectionIt);
        $this->category('Oceny i recenzje', 'Oceny_i_recenzje', $sectionIt);

        $this->category('Szkolenia i konferencje', 'Szkolenia_i_konferencje', $sectionCareer);
        $career = $this->category('Kariera', 'Kariera', $sectionCareer);
        $this->category('Edukacja', 'Edukacja', $sectionCareer);

        $this->category('Opinie o pracodawcach', 'Opinie_o_pracodawcach', 'Podkategorie', $career);
        $this->category('CV do oceny', 'CV_do_oceny', 'Podkategorie', $career);
    }

    private function category(string $name, string $slug, string $section, ?Forum $parent = null): Forum {
        $forum = Forum::query()->create([
            'name'             => $name,
            'slug'             => $slug,
            'parent_id'        => $parent?->id,
            'description'      => '',
            'section'          => $section,
            'enable_anonymous' => false,
        ]);
        event(new ForumSaved($forum));
        return $forum;
    }
}
