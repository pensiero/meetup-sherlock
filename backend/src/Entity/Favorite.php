<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="favorites")
 */
class Favorite
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(type="integer", unique=true)
     *
     * @var int
     */
    private $meetupId;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     *
     * @var \DateTime
     */
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * Info to be returned through API
     *
     * @return array
     */
    public function restInfo()
    {
        return [
            'id'        => $this->getId(),
            'meetup_id' => $this->getMeetupId(),
        ];
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getMeetupId(): int
    {
        return $this->meetupId;
    }

    /**
     * @param int $meetupId
     */
    public function setMeetupId(int $meetupId): void
    {
        $this->meetupId = $meetupId;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt(\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}
