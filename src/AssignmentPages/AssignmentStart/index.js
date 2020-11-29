import React from 'react'
import { CourseSideNav } from '../../CourseDashboard/SideNav_Course/SideNav'
import { Navbar } from '../../HomePage/components/Navbar_New'
import SideNav from '../../StudentDashboard/SideNav/SideNav'
import AssignmentStartCard from './AssignmentStartCard'
import { AssignmentHeading, AssignmentStartDiv, AssignmentStartPage } from './AssignmentStartElements'
import { AssignmentDetails } from './data'

const AssignmentStart = () => {
    return (
        <>
            <Navbar />
            <AssignmentStartPage>
                <CourseSideNav />
                <AssignmentStartDiv>
                    <AssignmentHeading>Assignment</AssignmentHeading>
                    <AssignmentStartCard {...AssignmentDetails} />

                </AssignmentStartDiv>
            </AssignmentStartPage>
        </>
    )
}

export default AssignmentStart