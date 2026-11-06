<?php
namespace Coyote\Services;

use Coyote\Firewall;
use Coyote\Repositories\Contracts\FirewallRepositoryInterface;
use Illuminate\Cache\Repository as Cache;
use Illuminate\Http\Request;

class Rules
{
    const CACHE_KEY = 'firewall';

    /**
     * @var Request
     */
    private $request;

    public function __construct(private Cache $cache, private FirewallRepositoryInterface $repository) {}

    public function find(Request $request): ?Firewall
    {
        $this->request = $request;
        foreach ($this->getRules() as $rule) {
            if ($this->checkIpRule($rule['ip'])
                || $this->checkUserRule($rule['user_id'])
                || $this->checkFingerprintRule($rule['fingerprint'] ?? null)) {
                return $this->make($rule);
            }
        }
        return null;
    }

    /**
     * @param string|null $ip
     * @return bool
     */
    private function checkIpRule($ip): bool
    {
        if (empty($ip)) {
            return false;
        }
        $pattern = \str_replace('\*', '[a-z0-9\:\.]+', \preg_quote($ip));
        return preg_match("/^$pattern\$/", $this->request->ip());
    }

    /**
     * @param int|null $userId
     * @return bool
     */
    private function checkUserRule($userId): bool
    {
        if (empty($userId) || empty($this->request->user())) {
            return false;
        }
        return $this->request->user()->id == $userId;
    }

    private function checkFingerprintRule($fingerprint): bool
    {
        if (empty($fingerprint)) {
            return false;
        }
        return $fingerprint === $this->getClientFingerprint();
    }

    private function getClientFingerprint()
    {
        static $fingerprint;
        if (!empty($fingerprint)) {
            return $fingerprint;
        }
        $className = 'Coyote\Fingerprint';
        if (class_exists($className)) {
            $fingerprint = $className::get();
        }
        return $fingerprint;
    }

    /**
     * @return array
     */
    private function getRules()
    {
        return unserialize(
            $this->cache->rememberForever(self::CACHE_KEY, function () {
                return serialize($this->repository->all(['id', 'user_id', 'ip', 'fingerprint'])->toArray());
            }),
        );
    }

    private function make(array $firewall): ?Firewall
    {
        return $this->repository->find($firewall['id']);
    }
}
