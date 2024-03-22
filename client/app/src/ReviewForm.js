import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function ReviewForm(){
    return(
        <div class="dialog-box">
            <div class="dialog-header">
                "Users Name"
                <button>X</button>
            </div>
            <div class="dialog-body">
                <Row>
                    <div>
                        <p>
                            "Status:"
                        </p>
                        <select>
                            <option value="accepted">Accepted</option>
                            <option value="Pending">Pending</option>
                            <option value="Pending/Exception">Pending/Exception</option>
                            <option value="Pending/Dismissed">Pending/Dismissed</option>
                            <option value="Pending/Reinstated">Pending/Reinstated</option>
                            <option value="Pending(All)">Pending(All)</option>
                            <option value="Declined">Declined</option>
                            <option value="Declined/Exception">Declined/Exception</option>
                            <option value="Withdrawn">Withdrawn</option>
                        </select>
                    </div>
                </Row>
                <Row>
                    <p>
                        Admin Notes:
                    </p>
                    <input type="text" value="Notes Tes"></input> {/* Need to link this to the main admin page admin notes */}
                </Row>
                <Row>
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="Col">Course</th>
                                <th scope="Col">Status</th>
                                <th scope="Col">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="course">CIS 015</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">CIS 115</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">CIS 200</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">CIS 300</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">CIS 301</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">ECE 241</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">MATH 220</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="course">MATH 221</td>
                                <td class="status"></td> {/* complete or in-progress here, need to link it to db for specific student */}
                                <td class="grade"></td> {/* grade, same thing here */}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colspan="2" style="text-align: right;">
                                    <strong>Cumulative GPA</strong>
                                </td>
                                <td>???</td> {/* GPA, need to link this too */}
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>
        </div>
    )
}