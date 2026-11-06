<?php
namespace Coyote\View;

class FormatNumber {
    public function formatShort(int $number): string {
        if ($number >= 1_000_000) {
            return round($number / 1_000_000, 1) . 'm';
        }
        if ($number > 950) {
            return \round($number / 1000) . 'k';
        }
        return "$number";
    }

    public function formatLong(int $number): string {
        if (\strlen("$number") > 3) {
            return \subStr_replace("$number", ' ', -3, 0);
        }
        return $number;
    }
}
