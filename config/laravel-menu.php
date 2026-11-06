<?php

return [
    'settings' => [
        'default'          => [
            'auto_activate'    => true,
            'activate_parents' => true,
            'active_class'     => 'active neon-tab-active',
            'restful'          => false,
            'cascade_data'     => true,
            'rest_base'        => '',      // string|array
            'active_element'   => 'link',  // item|link
        ],
        '_forum'           => [
            'auto_activate' => false,
            'restful'       => true,
        ],
    ],

    // _ na poczatku gdyz ten plugin korzysta z metody share() klasy View, a nazwa "forum" moze
    // wchodzic w konflikt z innymi zmiennymi przekazywanymi do twiga
    '_forum'           => [
        'Kategorie'      => ['route' => 'forum.categories', 'class' => 'nav-item neon-forum-tab'],
        'Wszystkie'      => ['route' => 'forum.all', 'class' => 'nav-item neon-forum-tab'],
        'Obserwowane'    => ['route' => 'forum.subscribes', 'class' => 'nav-item neon-forum-tab', 'data' => ['role' => true]],
        'Biorę udział'   => ['route' => 'forum.mine', 'class' => 'nav-item neon-forum-tab', 'data' => ['role' => true], 'title' => 'Wątki w których brałem udział'],
        'Z moimi tagami' => ['route' => 'forum.interesting', 'class' => 'nav-item neon-forum-tab', 'data' => ['role' => true], 'title' => 'Wątki zawierające moje tagi'],
    ],
];
