<?php
namespace Coyote\Services\Parser\Parsers;

class OpenInNewTabIfExternal extends \HTMLPurifier_AttrTransform {
    public function __construct(private readonly string $hostname) {}

    public function transform($attr, $config, $context): array {
        if (isset($attr['href'])) {
            $hostname = $this->urlHostname($attr['href']);
            if ($hostname && $this->isExternal($hostname)) {
                $attr['target'] = '_blank';
            }
        }
        return $attr;
    }

    private function isExternal(string $hostname): bool {
        return $hostname !== $this->hostname;
    }

    private function urlHostname(string $url): ?string {
        $parsed = parse_url($url);
        return $parsed['host'] ?? null;
    }
}
