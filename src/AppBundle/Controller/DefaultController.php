<?php

namespace AppBundle\Controller;

use AppBundle\Repository\TaskRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * Render the main view
     * @Route("/", name="homepage")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('default/index.html.twig', [
            'tasks' => $this->getTaskRepository()->getAll(),
        ]);
    }

    /**
     * Entry point for adding new tasks
     *
     * @Route("/add", name="add")
     * @Method("POST")
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function addAction(Request $request)
    {
        $task = $request->get('task');

        try {
            $this->getTaskRepository()->add($task);
            $this->addFlash('info', 'Taak toegevoegd');
        } catch (\Exception $exception) {
            $this->addFlash('warning', 'Kon taak niet toevoegen');
        }

        return $this->redirectToRoute('homepage');
    }

    /**
     * Entry point for editing tasks
     *
     * @Route("/edit/{id}", name="edit")
     * @Method("POST")
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function editAction(Request $request)
    {
        $taskId = $request->get('id');
        $task   = $request->get('task');

        try {
            $this->getTaskRepository()->edit($taskId, $task);
            $this->addFlash('info', 'Taak aangepast');
        } catch (\Exception $exception) {
            $this->addFlash('warning', 'Taak niet aangepast');
        }

        return $this->redirectToRoute('homepage');
    }

    /**
     * Entry point for deleting tasks
     *
     * @Route("/delete/{id}", name="delete")
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request)
    {
        $taskId = $request->get('id');

        try {
            $this->getTaskRepository()->delete($taskId);
            $this->addFlash('info', 'Taak verwijderd');
        } catch (\Exception $exception) {
            $this->addFlash('warning', 'Kon taak niet verwijderen');
        }

        return $this->redirectToRoute('homepage');
    }

    /**
     * Entry point for marking tasks todo/completed
     *
     * @Route("/complete/{id}/{complete}", name="complete")
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function markCompleted(Request $request)
    {
        $taskId   = $request->get('id');
        $complete = $request->get('complete');

        try {
            $this->getTaskRepository()->complete($taskId, $complete);
            $this->addFlash('info', 'Taak gemarkeerd als ' . ($complete ? 'voltooid' : 'niet voltooid'));
        } catch (\Exception $exception) {
            $this->addFlash('warning', 'Kon taak niet markeren als voltooid');
        }

        return $this->redirectToRoute('homepage');
    }

    /**
     * Returns the Task Repository
     * @return TaskRepository
     */
    protected function getTaskRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Task');
    }
}
